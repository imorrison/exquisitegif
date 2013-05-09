class BuiltGif < ActionMailer::Base
  default from: "Exquisitegif <app15404279@heroku.com>"

  def building_gif(user)
    @user = user
    @url = "http://exquisitegif.herokuapp.com/users/login"
    mail(to: @user.email, subject: "Your GIF is being built!")
  end
end
