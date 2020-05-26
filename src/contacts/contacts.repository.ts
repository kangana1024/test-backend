import { Contacts } from "./contacts.entity";
import { EntityRepository, Repository, EntityManager } from "typeorm";

@EntityRepository(Contacts)
export class ContactsRepository extends Repository<Contacts> {
  constructor(private entityManager: EntityManager) {
    super();
  }
  async getAllGroup(userId: number) {
    const groups = await this.entityManager.query(`
    SELECT
    contact_group.id,
    contact_group."name",
    COUNT(contacts.id)
  FROM
    contact_group
  LEFT JOIN
    contacts
  ON
    contacts.groupid = contact_group.id
  WHERE
    contact_group."owner" = $1
  GROUP BY
    contact_group.id
    `, [userId]);

    return groups;
  }
}