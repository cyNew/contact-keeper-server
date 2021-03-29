import { Injectable } from '@nestjs/common';
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

  async getAllContacts(userId: any) {
    return await this.contactModel.find({ user: userId }).exec();
  }

  async createContact(createContactDto: CreateContactDto, userId: string) {
    const newContact = new this.contactModel({
      ...createContactDto,
      user: userId,
    });

    await newContact.save();

    return newContact;
  }

  async updateContact(updateContactDto: UpdateContactDto, contactId: string) {
    return await this.contactModel.findByIdAndUpdate(
      contactId,
      {
        $set: updateContactDto,
      },
      { new: true },
    );
  }

  async deleteOneContact(contactId: string) {
    return await this.contactModel.findByIdAndRemove(contactId);
  }
}
