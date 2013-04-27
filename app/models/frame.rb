class Frame < ActiveRecord::Base
  attr_accessible :animation_id, :data_url, :user_id

  belongs_to :animation
end
