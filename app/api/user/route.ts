import { db } from '@/app/lib/db';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import * as z from 'zod';

// Define a schema for input validation
const userSchema = z.object({
  username: z.string().min(1, 'Username is Required').max(100),
  email: z.string().min(1, 'Email is Required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is Required')
    .min(8, 'Password is Required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = userSchema.parse(body);

    // check if email exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: 'User with this email is already exists',
        },
        { status: 409 }
      );
    }

    // check if the username is alreay exists
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: 'User with this username is already exists',
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: 'User created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Something went wrong! ${error.message}`,
      },
      { status: 500 }
    );
  }
}
