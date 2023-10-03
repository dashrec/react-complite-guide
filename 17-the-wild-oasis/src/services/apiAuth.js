import supabase, { supabaseUrl } from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession(); // gets data from local storage

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser(); // it is more secure to re download user from supabase and not just get from local storage

  if (error) throw new Error(error.message);
  return data?.user; // we are only interested to return only a user not session
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  // only one of them can be updated at a time, meaning they both can never be true at the same time
  if (password) updateData = { password }; // if its password, updateData is gonna be a password object
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData); // this will know which user is cur logged in

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars') // bucket name
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    // avatar goes to the data obj as fullName
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`, // url to the image
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}

//https://rquplcrnxhowjzrfzokq.supabase.co/storage/v1/object/public/avatars/cabin-008.jpg?t=2023-10-02T10%3A16%3A51.627Z
