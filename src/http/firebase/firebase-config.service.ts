import { ApiError } from 'src/core/exceptions/ApiError';

export class FirebaseConfigService {
  constructor(public readonly apiKey: string) {
    if (!apiKey) {
      throw new ApiError('Missing required Firebase API key!', '@application/firebase-apikey-not-found', 500);
    }
  }
}
