export class Book {
  public get prix(): number {
    return this._prix;
  }
  public set prix(value: number) {
    this._prix = value;
  }
  public get auteur(): string {
    return this._auteur;
  }
  public set auteur(value: string) {
    this._auteur = value;
  }
  public get titre(): string {
    return this._titre;
  }
  public set titre(value: string) {
    this._titre = value;
  }
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  constructor(
    private _id: number,
    private _titre: string,
    private _auteur: string,
    private _prix: number){}



}
