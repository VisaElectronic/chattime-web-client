export default interface CreateGroupDto extends Record<string, string | string[] | File[] | null> {
  groupName: string;
  photo: File[];
  channelKeys: string[];
}