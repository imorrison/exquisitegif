class Invitation < ActiveRecord::Base
  attr_accessible :animation_id, :email, :twitter_handle

  belongs_to :animation, inverse_of: :invitations
  belongs_to :email_invitee, :foreign_key => :email, :class_name => 'User'

  # the twitter association will not yet work 
  belongs_to :twitter_invitee, :foreign_key => :twitter_handle,
                :primary_key => :username, :class_name => 'User'

  validates :animation, presence: true

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }
end
