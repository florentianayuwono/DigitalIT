function NoPlatform() {
  return (
    <>
      Congrats on digitalizing your business! You might also want to consider
      opening a store on this platform.
    </>
  );
}

export default function SuitablePlatform({ business }) {
  return (<NoPlatform />);
}
