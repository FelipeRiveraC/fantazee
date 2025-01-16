# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

# Prevent the "fork() in multi-threaded Ruby" error on macOS
if Gem.win_platform? || RbConfig::CONFIG['host_os'] =~ /darwin|mac os/
  ENV['OBJC_DISABLE_INITIALIZE_FORK_SAFETY'] = 'YES'
end
