export default interface RemoveMemberDto extends Record<string, string | string[] | File[] | undefined> {
  channelKey: string;
}