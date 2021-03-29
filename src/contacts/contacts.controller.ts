import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  async getAllContacts(@Request() req) {
    const { userId } = req.user;

    const data = await this.contactsService.getAllContacts(userId);
    return {
      data,
    };
  }

  @Post()
  async createContact(
    @Body() createContactDto: CreateContactDto,
    @Request() req,
  ) {
    const data = await this.contactsService.createContact(
      createContactDto,
      req.user.userId,
    );

    return {
      data: [data],
    };
  }

  @Put(':id')
  async updateContact(
    @Param('id') contactId: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    const data = await this.contactsService.updateContact(
      updateContactDto,
      contactId,
    );

    return {
      data,
    };
  }

  @Delete(':id')
  async deleteContact(@Param('id') contactId: string) {
    const data = await this.contactsService.deleteOneContact(contactId);
    return {
      data,
    };
  }
}
