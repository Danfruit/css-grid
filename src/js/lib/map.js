  // map

initMap();

async function initMap() {
    await ymaps3.ready;
    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker} = ymaps3;
    const map = new YMap(
        document.querySelector('.contacts__map'),
        {
            location: {
                center: [37.617933, 55.758772],
                zoom: 13
            },

        },
    );

    const markerElement = document.createElement('div');
    markerElement.className = 'map__point';
    markerElement.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="6" fill="#FF6E30"/></svg>';

    const marker = new YMapMarker(
      {
        coordinates: [37.636024, 55.770173],
        draggable: true,
        mapFollowsOnDrag: true,
      },
      markerElement,
    );

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer({}))
    map.addChild(marker);
  }
