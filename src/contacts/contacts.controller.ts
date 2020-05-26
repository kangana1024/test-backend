import { Controller, Get, UseGuards, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { CreateContactGroupsDto } from './dto/contactgroups.dto';
import { CreateContactsDto, UpdateContactsDto } from './dto/contacts.dto';

@Controller('contacts')
@UseGuards(AuthGuard())
export class ContactsController {
  constructor(
    private contactService: ContactsService
  ) { }
  @Get('/group')
  async getAllGroup(@GetUser() user: User) {
    return await this.contactService.getAllGroup(user.id);
  }

  @Post('/group')
  async creatGroup(
    @Body() createContactGroups: CreateContactGroupsDto,
    @GetUser() user: User
  ) {
    return await this.contactService.creatGroup(createContactGroups, user)
  }

  @Get('/group/:id')
  async getContactByGroupID(
    @Param('id', ParseIntPipe) gid: number,
    @GetUser() user: User
  ) {
    return await this.contactService.getContactByGroupID(gid, user);
  }

  @Post('/group/:id')
  async creatContactByGroup(
    @Param('id', ParseIntPipe) gid: number,
    @Body() createContacts: CreateContactsDto,
    @GetUser() user: User
  ) {
    return await this.contactService.creatContactByGroup(gid,createContacts, user)
  }

  @Post('/update/:id')
  async updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContacts: UpdateContactsDto,
    @GetUser() user: User
  ) {
    return await this.contactService.updateContactByGroup(id,updateContacts, user)
  }

  @Post('/delete/:id')
  async deleteContact(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ) {
    return await this.contactService.deleteContactByGroup(id, user)
  }
}
