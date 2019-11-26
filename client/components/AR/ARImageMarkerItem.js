export default ARImageMarkerItem = () => {

return (
    <ViroARImageMarker target={"targetOne"}
        onAnchorFound={
            () => setAnimation(true)}
    >
        <ViroNode key="card">
            <ViroNode
                opacity={0} position={[0, -0.02, 0]}
                dragType="FixedToWorld"
                animation={{
                    name: 'animateImage',
                    run: runAnimation,
                    loop: false
                }}
            >
                <ViroFlexView
                    rotation={[-90, 0, 0]}
                    height={1}
                    width={1}
                    style={styles.card}
                >
                    <ViroFlexView
                        style={styles.cardWrapper}
                    >
                        {/* <ViroImage
                        height={0.015}
                        width={0.015}
                        style={styles.image}
                        source={{ url: (`https://i.ibb.co/qWf8pm0/Cabinet.jpg`) }}
                    /> */}
                        <ViroText
                            textClipMode="None"
                            text="This worked!"
                            scale={[.25, .25, .25]}
                            style={styles.textStyle}
                        />
                    </ViroFlexView>
                    <ViroFlexView
                        style={styles.subText}
                    >
                        <ViroText
                            width={0.01}
                            height={0.01}
                            textAlign="left"
                            textClipMode="None"
                            text="THIS WORKEDDD"
                            scale={[.1, .1, .1]}
                            style={styles.textStyle}
                        />
                    </ViroFlexView>
                </ViroFlexView>
            </ViroNode>
        </ViroNode>
    </ViroARImageMarker>
  );
}