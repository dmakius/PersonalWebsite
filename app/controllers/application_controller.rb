class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :mobile_device?

  private
    def mobile_device?
  	   request.user_agent =~ /Mobile|webOS/
     end
end
