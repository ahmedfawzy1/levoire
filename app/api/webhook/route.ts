import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { CartStatus } from '@prisma/client';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('Stripe-Signature');

    if (!signature) {
      console.error(
        'Missing Stripe signature: Missing signature in request headers.',
      );
      return NextResponse.json('Stripe signature is required.', {
        status: 400,
      });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.WEBHOOK_SIGNIN_SECRET!,
      );
    } catch (error: any) {
      console.error(
        `Stripe webhook error: Signature verification failed - ${error.message}`,
      );
      return NextResponse.json(
        { error: 'Invalid Stripe signature.' },
        {
          status: 400,
        },
      );
    }

    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const purchasedId = session?.metadata?.productIds;
      const userId = parseInt(session?.metadata?.userId as string, 10);

      if (!purchasedId || isNaN(userId)) {
        console.error(
          'Stripe webhook error: Missing or invalid productIds or userId in session metadata.',
        );
        return NextResponse.json(
          { error: 'Invalid or Missing productIds or userId in metadata' },
          {
            status: 400,
          },
        );
      }

      try {
        const productArray = JSON.parse(purchasedId);

        if (Array.isArray(productArray) && productArray.length > 0) {
          // Update the cart status to complete
          const updateResult = await db.cart.updateMany({
            where: {
              userId: userId,
              status: CartStatus.PENDING,
            },
            data: {
              status: CartStatus.COMPLETED,
            },
          });

          if (updateResult.count > 0) {
            console.log(`Payment processed completed for user ID: ${userId}`);
          } else {
            console.warn(`No pending cart found for user ID: ${userId}`);
          }
        } else {
          console.error(
            'Stripe webhook error: Invalid format for productIds metadata.',
          );
          return NextResponse.json('Invalid productIds IDs format', {
            status: 400,
          });
        }
      } catch (error: any) {
        console.error(
          `Failed to process payment for user ID ${userId}: ${error.message}`,
        );
        return NextResponse.json(
          `Payment processing failed: ${error.message}`,
          {
            status: 500,
          },
        );
      }
    } else {
      console.log(`Unhandled event type received: ${event.type}`);
    }

    return NextResponse.json(
      { message: 'Webhook received and processed successfully' },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(`Failed to process Stripe webhook: ${error.message}`);
    return NextResponse.json(
      { error: `Failed to process webhook ${error.message}` },
      { status: 500 },
    );
  }
}
