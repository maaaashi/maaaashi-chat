export class Chat {
  constructor(
    private _id: string,
    private _content: string,
    private _username: string,
    private _imageUrl: string,
    private _createdAt: Date
  ) {}

  get id() {
    return this._id
  }

  get content() {
    return this._content
  }

  get username() {
    return this._username
  }

  get imageUrl() {
    return this._imageUrl
  }

  get createdAt() {
    return this._createdAt
  }
}
