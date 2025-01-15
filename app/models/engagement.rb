class Engagement < ApplicationRecord
  enum status: { unstarted: 'UNSTARTED', active: 'ACTIVE', complete: 'COMPLETE'}

  validates :name, :status, presence: true
end

# == Schema Information
#
# Table name: engagements
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  status     :enum             default("unstarted"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
