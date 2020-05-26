import { Injectable, InternalServerErrorException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ContactGroupRepository } from './contactgroups.repository';
import { ContactsRepository } from './contacts.repository';
import { ContactGroup } from './contactgroups.entity';
import { CreateContactGroupsDto } from './dto/contactgroups.dto';
import { User } from '../users/user.entity';
import { Contacts } from './contacts.entity';
import { CreateContactsDto, UpdateContactsDto } from './dto/contacts.dto';

@Injectable()
export class ContactsService {
  constructor(
    private contactsRepository: ContactsRepository
  ) { }

  async getAllGroup(userId: number)//: Promise<ContactGroup[]> 
  {
    if (!userId) {
      throw new UnauthorizedException()
    }
    return await this.contactsRepository.getAllGroup(userId);
  }

  async creatGroup(createContactGroups: CreateContactGroupsDto, user: User): Promise<ContactGroup> {
    if (!user.id) {
      throw new UnauthorizedException()
    }
    const contactGroup = new ContactGroup();

    contactGroup.name = createContactGroups.name;
    contactGroup.owner = user.id;

    try {
      const res = await contactGroup.save();
      return res;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async getContactByGroupID(gid: number, user: User): Promise<Contacts[]> {
    if (!user.id) {
      throw new UnauthorizedException()
    }
    try {
      const contacts = await this.contactsRepository.find({
        where: {
          owner: user.id,
          groupid: gid
        }
      });
      return contacts;
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async creatContactByGroup(gid: number, createContacts: CreateContactsDto, user: User) {
    if (!user.id) {
      throw new UnauthorizedException()
    }
    const { firstname, lastname, bod, phone = '', email = '', url = '' } = createContacts;

    const contact = new Contacts();
    contact.firstname = firstname;
    contact.lastname = lastname;
    contact.bod = new Date(bod + ':00:00:00');
    contact.phone = phone;
    contact.email = email;
    contact.url = url;
    contact.groupid = gid;
    contact.owner = user.id;
    try {
      const res = await contact.save();
      return res;
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async updateContactByGroup(id: number, updateContacts: UpdateContactsDto, user: User) {
    if (!user.id) {
      throw new UnauthorizedException()
    }
    const { firstname, lastname, bod, phone = '', email = '', url = '' } = updateContacts;

    const contact = await this.contactsRepository.findOne(id);
    contact.firstname = firstname;
    contact.lastname = lastname;
    contact.bod = new Date(bod + ':00:00:00');
    contact.phone = phone;
    contact.email = email;
    contact.url = url;
    contact.owner = user.id;
    try {
      const res = await contact.save();
      return res;
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
  async deleteContactByGroup(id: number, user: User) {
    const result = await this.contactsRepository.delete({ id, owner: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found !`);
    }
  }
}
