/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://arthur:X101RjKWlQjr65n0@cluster0.y8udl.mongodb.net/redesocial?retryWrites=true&w=majority'),
  },
];