import { PeopleModel } from '../../config/models/people.model';

export class CrudPeopleService {
  async create(data: Partial<PeopleModel>): Promise<number | undefined> {
    const person = await PeopleModel.create(data);
    return person.id;
  }

  async update(data: Partial<PeopleModel>) {
    await PeopleModel.update(data, { where: { id: data.id } });
  }
}
