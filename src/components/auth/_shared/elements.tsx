import Loading from "@/components/icons/Loading";

export const loadingElement = (
  <div className="absolute inset-0 flex items-center justify-center bg-night-0/50">
    <Loading />
  </div>
);

export const errorElement = (
  <div className="bg-aurora-0/60 border border-aurora-0 rounded text-snow-0 text-center text-sm my-8 p-4">
    Ops, an error occured.
  </div>
);

export const successElement = (
  <div className="absolute inset-0 flex items-center justify-center bg-night-0/50">
    <div className="bg-aurora-3/60 border border-aurora-3 rounded text-snow-0 text-center text-sm my-8 p-4">
      User created!
    </div>
  </div>
);

