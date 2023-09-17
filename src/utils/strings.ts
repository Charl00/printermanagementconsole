export const isIpCorrect = (input: string) => {
  const ipRegex = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;

  return ipRegex.test(input);
};
