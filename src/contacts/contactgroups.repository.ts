import { Repository, EntityRepository } from "typeorm";
import { ContactGroup } from "./contactgroups.entity";

@EntityRepository(ContactGroup)
export class ContactGroupRepository extends Repository<ContactGroup> { }