import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Firestore } from 'firebase-admin/firestore';

interface ServiceAccount {
  project_id: string;
  private_key: string;
  client_email: string;
}

@Injectable()
export class FirebaseRepository {
  private firestore: Firestore;

  constructor(private readonly configService: ConfigService) {
    const credentials = this.configService.get<string>('FIREBASE_ADMIN_CREDENTIALS');

    const serviceAccount: ServiceAccount = JSON.parse(credentials);

    const { client_email, private_key, project_id } = serviceAccount;

    this.firestore = new Firestore({
      projectId: project_id,
      credentials: { client_email, private_key },
    });
  }

  getFirestore(): Firestore {
    return this.firestore;
  }
}
