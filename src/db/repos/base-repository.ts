import { Kysely } from "kysely";
import IDatabase from "../db-interface";

abstract class BaseRepository {
  _db: Kysely<IDatabase>;

  constructor(db: Kysely<IDatabase>) {
    this._db = db;
  }
}

export default BaseRepository;
