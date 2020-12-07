const { Xfo, EulerAngles } = window.zeaEngine
const { CADAsset } = window.zeaCad

const loadAsset = () => {
  const asset = new CADAsset()
  const xfo = new Xfo()
  xfo.sc.set(2);
  xfo.ori.setFromEulerAngles(new EulerAngles(0.0, Math.PI * -0.5, 0, 'ZXY'))

  asset.getParameter('GlobalXfo').setValue(xfo)
  asset.getParameter('FilePath').setValue('https://cdn.glitch.com/193338d7-ba53-46cc-8930-c8d69b1c0a34%2F190153_ZSK_MockUpB_Steel-Anchors-M.zcad?v=1606784072811')

  return asset
}

export default loadAsset