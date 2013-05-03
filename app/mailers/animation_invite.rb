class AnimationInvite < ActionMailer::Base
  default from: "Exquisitegif <app15404279@heroku.com>"

  def invite_email(user, invitee_email)
    @user = user
    @url = "http://exquisitegif.herokuapp.com/users/login"
    mail(to: invitee_email, subject: "You have been invited to work on an exquisite.gif")
  end
end
