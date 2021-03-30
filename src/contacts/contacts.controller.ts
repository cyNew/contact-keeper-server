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
import { AuthRequest } from 'src/auth/auth.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ContactRequest } from './contacts.interface';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  async getAllContacts(@Request() req: ContactRequest) {
    const { userId } = req.user;

    return await this.contactsService.getAllContacts(userId);
  }

  @Post()
  async createContact(
    @Body() createContactDto: CreateContactDto,
    @Request() req: ContactRequest,
  ) {
    const { userId } = req.user;

    return await this.contactsService.createContact(createContactDto, userId);
  }

  @Put(':id')
  async updateContact(
    @Param('id') contactId: string,
    @Body() updateContactDto: UpdateContactDto,
    @Request() req: ContactRequest,
  ) {
    const { userId } = req.user;

    return await this.contactsService.updateContact(
      updateContactDto,
      contactId,
      userId,
    );
  }

  @Delete(':id')
  async deleteContact(
    @Param('id') contactId: string,
    @Request() req: AuthRequest,
  ) {
    const { userId } = req.user;

    return await this.contactsService.deleteOneContact(contactId, userId);
  }
}
