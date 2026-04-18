interface DataErrorProps {
  message: string;
}
export const CardError = ({ message }: DataErrorProps) => {
  return <div>{message}</div>;
};
