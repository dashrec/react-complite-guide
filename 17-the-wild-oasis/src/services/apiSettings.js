import supabase from './supabase';

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }
  return data;
}

//newSetting is gonna be like --> minBookingLength:"3" or axGuestsPerBooking: '4' etc based on which field we update from updatesettings form
export async function updateSetting(newSetting) {
  console.log(newSetting);
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }
  return data;
}
