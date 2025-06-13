import { FirestoreCollectionName } from '@configs/firestoreCollectionName';
import { Article } from '@models/Article';
import { Injectable } from '@nestjs/common';
import { AddDocument, ReadOptions, WriteOptions } from '@typings/typings';
import { ofFirestore } from '@utils/ofFirestore';
import { serverTimestamp } from '@utils/serverTimestamp';
import { toFirestore } from '@utils/toFirestore';
import { Query } from 'firebase-admin/firestore';
import { FirebaseRepository } from './firebase.repository';

@Injectable()
export class ArticleRepository {
  private collection: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >;

  constructor(private readonly firebaseRepository: FirebaseRepository) {
    const firestore = this.firebaseRepository.getFirestore();
    const collectionPath = FirestoreCollectionName.ARTICLES;
    this.collection = firestore.collection(collectionPath);
  }

  /**
   * Adiciona um novo documento à coleção.
   *
   * @param {AddDocument<T>} data - Dados do documento a ser adicionado.
   * @param {WriteOptions} [options={ timestamps: true }] - Opções de escrita.
   * @returns {Promise<string>} ID do documento criado.
   *
   * @example
   * const userRepo = new UserRepository();
   * const newUserId = await userRepo.add({ name: 'John Doe', email: 'john@example.com' });
   */
  public async add(data: AddDocument<Article>, options: WriteOptions = { timestamps: true }) {
    const clone = toFirestore(data);

    if (options.timestamps) {
      clone.createdAt = serverTimestamp();
      clone.updatedAt = null;
    }

    Reflect.deleteProperty(clone, 'id');

    const { id } = await this.collection.add(clone);

    return id;
  }

  public getAll(options: ReadOptions = { timestamps: true }) {
    return this.getDocs(this.collection, options);
  }

  protected async getDocs(query: Query, options: ReadOptions = { timestamps: true }): Promise<Article[]> {
    const { docs } = await query.get();

    return docs.map((document) => ofFirestore<Article>(document, options.timestamps));
  }
}
