-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles (users can see their own profile)
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for chats (users can only see their own chats)
CREATE POLICY "Users can view their own chats" ON chats
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create chats" ON chats
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own chats" ON chats
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own chats" ON chats
  FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for messages (users can only access messages from their own chats)
CREATE POLICY "Users can view messages from their chats" ON messages
  FOR SELECT USING (chat_id IN (SELECT id FROM chats WHERE user_id = auth.uid()));

CREATE POLICY "Users can create messages in their chats" ON messages
  FOR INSERT WITH CHECK (chat_id IN (SELECT id FROM chats WHERE user_id = auth.uid()) AND user_id = auth.uid());

-- RLS Policies for events (anyone can read, only creators can modify)
CREATE POLICY "Anyone can view events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create events" ON events
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own events" ON events
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own events" ON events
  FOR DELETE USING (auth.uid() = created_by);

-- RLS Policies for clubs (anyone can read, only creators can modify)
CREATE POLICY "Anyone can view clubs" ON clubs
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create clubs" ON clubs
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own clubs" ON clubs
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own clubs" ON clubs
  FOR DELETE USING (auth.uid() = created_by);

-- RLS Policies for club_members (anyone can read, only authenticated users can join)
CREATE POLICY "Anyone can view club members" ON club_members
  FOR SELECT USING (true);

CREATE POLICY "Users can join clubs" ON club_members
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can leave clubs" ON club_members
  FOR DELETE USING (user_id = auth.uid());
