class FramesController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    @frame = Frame.new(
      data_url: params[:data_url],
      animation_id: params[:animation_id],
      user_id: current_user.id
      )

    if @frame.save
      render json: @frame
    else
      render json: @frame.errors.full_messages, status: 422
    end
  end

  def show
    if params[:previous]
      @frame = Frame.where("animation_id = ?", params[:animation_id])
                    .order("created_at DESC")
                    .limit(1)

      render json: @frame[0]
    end
  end
end
