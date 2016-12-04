module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    def disconnect
      if current_user = User.find_by(id: cookies.signed[:user_id])
        current_user.update_attribute(:presence, DateTime.now.strftime('%B %d, %H:%M:%S'))
      end
    end

    protected
      def find_verified_user
        if current_user = User.find_by(id: cookies.signed[:user_id])
          current_user.update_attribute(:presence, 'online')
          current_user
        else
          reject_unauthorized_connection
        end
      end
  end
end
