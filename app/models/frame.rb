class Frame < ActiveRecord::Base
  attr_accessible :animation_id, :data_url, :user_id

  belongs_to :animation, counter_cache: true
  belongs_to :users

  validates :animation_id, :data_url, :user_id, presence: true
  validate :frame_count

  def frame_count
    count = Animation.find(self.animation_id).frames_count
    return true if count.nil?
    count <= 50
  end
end