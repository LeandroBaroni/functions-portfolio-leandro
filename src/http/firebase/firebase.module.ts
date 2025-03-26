import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebaseAdmin from 'firebase-admin';
import { ApiError } from 'src/core/exceptions/ApiError';
import { FirebaseRepository } from 'src/core/repositories/firebase.repository';
import { FirebaseConfigService } from './firebase-config.service';
import { FirebaseService } from './firebase.service';

@Global()
@Module({})
export class FirebaseModule {
  static forRoot(): DynamicModule {
    const firebaseConfigProvider = {
      provide: FirebaseConfigService,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get<string>('FIREBASE_API_KEY');
        if (!apiKey) {
          throw new ApiError(
            'FIREBASE_API_KEY environment variable is not set',
            '@application/environment-not-found',
            500
          );
        }

        return new FirebaseConfigService(apiKey);
      },
    };

    const firebaseProvider = {
      provide: 'FIREBASE_ADMIN',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const credentials = configService.get('FIREBASE_ADMIN_CREDENTIALS');

        if (!credentials) {
          throw new ApiError(
            'FIREBASE_ADMIN_CREDENTIALS environment variable is not set',
            '@application/environment-not-found',
            500
          );
        }
        const serviceAccount = JSON.parse(credentials);

        firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert(serviceAccount),
        });

        return firebaseAdmin;
      },
    };

    return {
      module: FirebaseModule,
      providers: [firebaseConfigProvider, firebaseProvider, FirebaseService, FirebaseRepository],
      exports: [firebaseConfigProvider, firebaseProvider, FirebaseService, FirebaseRepository],
    };
  }
}
