import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact, ContactDocument } from './schemas/contacts.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async getAllContacts(userId: string) {
    return await this.contactModel.find({ user: userId as any }).exec();
  }

  async createContact(createContactDto: CreateContactDto, userId: string) {
    const newContact = new this.contactModel({
      ...createContactDto,
      user: userId,
    });

    await newContact.save();

    return newContact;
  }

  async updateContact(
    updateContactDto: UpdateContactDto,
    contactId: string,
    userId: string,
  ) {
    const contact = await this.contactModel.findById(contactId);

    if (!contact) {
      throw new NotFoundException('This contact does not exist!');
    }

    if (!this.isMatched(contact, userId)) {
      throw new UnauthorizedException('This contact does not belong to you!');
    }

    return this.contactModel.findByIdAndUpdate(
      contactId,
      {
        $set: updateContactDto,
      },
      { new: true },
    );
  }

  async deleteOneContact(contactId: string, userId: string) {
    const contact = await this.contactModel.findById(contactId);

    if (!contact) {
      throw new NotFoundException('This contact does not exist!');
    }

    if (!this.isMatched(contact, userId)) {
      throw new UnauthorizedException('This contact does not belong to you!');
    }

    return this.contactModel.findByIdAndRemove(contactId);
  }

  protected isMatched(contact: ContactDocument, userId: string) {
    return contact.user.toString() === userId;
  }
}
