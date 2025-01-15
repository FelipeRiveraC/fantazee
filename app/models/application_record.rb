class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  include IdGenerator
  before_create :generate_id

  private

  def generate_id
    raise NotImplementedError
  end
end
