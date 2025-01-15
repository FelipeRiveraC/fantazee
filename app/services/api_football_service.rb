class ApiFootballService
  def get_leagues(code: nil, name: nil)
    query = { code: code, name: name }.compact
    query.delete_if { |_, value| value.nil? }
    response = client.get("/leagues", query: query)
    JSON.parse(response.body)
  end

  private

  def client
    @client ||= ApiFootballClient.new()
  end
  
end

