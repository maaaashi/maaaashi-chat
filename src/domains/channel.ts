export class Channel {
  constructor(private _id: string, private _name: string) {}

  get name() {
    return this._name
  }
}