const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@discription Get all contacts
//@route GET api/contact/
//@access Private
const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contact);
});

//@discription Get contact with id
//@route GET api/contact/
//@access Private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact.user_id.toString() === req.user.id) {
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    } else {
      res.status(200).json(contact);
    }
  } else {
    res.status(403);
    throw new Error("User don't have permission to access the Contact");
  }
});

//@discription Create contact
//@route POST api/contact/
//@access Private
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  } else {
    const contact = await Contact.create({
      user_id: req.user.id,
      name,
      email,
      phone,
    });
    res.status(200).json(contact);
  }
});

//@discription Update contact
//@route PUT api/contact/
//@access Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact.user_id.toString() === req.user.id) {
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    } else {
      const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedContact);
    }
  } else {
    res.status(403);
    throw new Error("User don't have permission to Update the Contact");
  }
});

//@discription Delete contact
//@route Delete api/contact/
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (contact.user_id.toString() === req.user.id) {
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    } else {
      res.status(200).json(contact);
    }
  } else {
    res.status(403);
    throw new Error("User don't have permission to Delete the Contact");
  }
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
