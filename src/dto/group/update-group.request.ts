export default interface UpdateGroupDto extends Record<string, string | string[] | File[] | undefined> {
  groupName?: string;
  photo?: File[];
  channelKeys?: string[];
}