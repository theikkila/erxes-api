import { Companies, Customers, Deals, Tags, Tasks, Users } from '../../db/models';
import { ICompanyDocument } from '../../db/models/definitions/companies';

export default {
  customers(company: ICompanyDocument) {
    return Customers.find({ companyIds: { $in: [company._id] } });
  },

  getTags(company: ICompanyDocument) {
    return Tags.find({ _id: { $in: company.tagIds || [] } });
  },

  owner(company: ICompanyDocument) {
    return Users.findOne({ _id: company.ownerId });
  },

  parentCompany(company: ICompanyDocument) {
    return Companies.findOne({ _id: company.parentCompanyId });
  },

  deals(company: ICompanyDocument) {
    return Deals.find({ companyIds: { $in: [company._id] || [] } });
  },

  inProgressTasks(company: ICompanyDocument) {
    return Tasks.find({ $and: [{ contentId: company._id, isDone: false }] });
  },

  doneTasks(company: ICompanyDocument) {
    return Tasks.find({ $and: [{ contentId: company._id, isDone: true }] });
  },
};
