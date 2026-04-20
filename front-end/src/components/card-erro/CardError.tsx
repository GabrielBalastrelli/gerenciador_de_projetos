interface DataErrorProps {
  message: string;
}
export const CardError = ({ message }: DataErrorProps) => {
  return (
    <div
      className="card mt-2 bg-danger text-white mb-2"
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <div className="card-body card-subtitle   shadow-sm p-3 rounded text-white ">
        <p className="text-center text-white">
          {message || "Erro Desconhecido!"}
        </p>
      </div>
    </div>
  );
};
