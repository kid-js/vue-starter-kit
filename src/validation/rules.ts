import {
  minLength,
  nonEmpty,
  string,
  email,
  pipe,
} from 'valibot'

export const rules = {
  email: pipe(
    string(),
    nonEmpty('Email is required'),
    email('Invalid email format'),
  ),

  password: pipe(
    string(),
    nonEmpty('Password is required'),
    minLength(8, 'Must be at least 8 characters'),
  ),
} as const
