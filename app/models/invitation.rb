class Invitation < ActiveRecord::Base
  attr_accessible :animation_id, :email, :twitter_handle

  belongs_to :animation, inverse_of: :invitation
  belongs_to :email_invitee, :foreign_key => :email, :class_name => 'User'

  # the twitter association will not yet work 
  belongs_to :twitter_invitee, :foreign_key => :twitter_handle,
                :primary_key => :username, :class_name => 'User'

  validates :animation, presence: true

  # I need to also validate the email with a regex
end
