class StaticPagesController < ApplicationController
  def index
    if user_signed_in?
      redirect_to :root
    end
  end
end
