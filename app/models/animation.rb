class Animation < ActiveRecord::Base
  attr_accessible :owner_id, :title

  has_many :frames
end
