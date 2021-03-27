import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('api/contacts')
export class ContactsController {
  @Get()
  async getAllContacts() {
    return 'get all contacts';
  }

  @Post()
  async createContact() {
    return 'create a contact';
  }

  @Put(':id')
  async updateContact(@Param('id') id: number) {
    return `update contact ${id}`;
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: number) {
    return `delete contact ${id}`;
  }
}
