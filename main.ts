import { ElementState, Preview } from '@creatomate/preview';

import './style.css';

const publicToken = 'public-7p7n35m68yzvbgrug2gfamfo';

let preview: Preview | undefined;
let modifications: any = {};

document.addEventListener('DOMContentLoaded', function () {
  // Set up preview
  preview = new Preview(document.querySelector('#video-player'), 'player', publicToken);

  preview.onReady = async () => {
    // Load video by JSON (to load a video by template, see 'loadTemplate')
    await preview.setSource(getDemoTemplateSource());

    // When the preview is done loading, set up the input controls
    await setUpInputControls();
  };
});

async function setUpInputControls() {
  const htmlElement = document.querySelector('#dynamic-elements');
  htmlElement.innerHTML = '';

  // Create input controls for each dynamic element in the template
  const dynamicElements = preview.getElements().filter((element) => element.source.dynamic);
  for (const element of dynamicElements) {
    if (element.source.type === 'text') {
      htmlElement.append(setUpTextInputControl(element));
    } else if (element.source.type === 'image') {
      htmlElement.append(setUpImageInputControl(element));
    } else if (element.source.type === 'video') {
      htmlElement.append(setUpVideoInputControl(element));
    }
  }
}

function setUpTextInputControl(element: ElementState): HTMLElement {
  // Create <input> element
  const htmlInputElement = document.createElement('input');
  htmlInputElement.placeholder = element.source.text;
  htmlInputElement.addEventListener('input', () => setModification(element, htmlInputElement.value));

  // Create <label> element
  const htmlLabelElement = document.createElement('label');
  htmlLabelElement.className = 'dynamic-element-label';
  htmlLabelElement.append(element.source.name ?? element.source.type);
  htmlLabelElement.append(htmlInputElement);

  return htmlLabelElement;
}

function setUpImageInputControl(element: ElementState): HTMLElement {
  return setUpMediaInputControl(element, {
    '(default)': '',
    'Example image 1': 'https://creatomate-static.s3.amazonaws.com/demo/image1.jpg',
    'Example image 2': 'https://creatomate-static.s3.amazonaws.com/demo/image2.jpg',
    'Example image 3': 'https://creatomate-static.s3.amazonaws.com/demo/image3.jpg',
  });
}

function setUpVideoInputControl(element: ElementState): HTMLElement {
  return setUpMediaInputControl(element, {
    '(default)': '',
    'Example video 1': 'https://creatomate-static.s3.amazonaws.com/demo/video1.mp4',
    'Example video 2': 'https://creatomate-static.s3.amazonaws.com/demo/video2.mp4',
    'Example video 3': 'https://creatomate-static.s3.amazonaws.com/demo/video3.mp4',
  });
}

function setUpMediaInputControl(element: ElementState, examples: Record<string, string>): HTMLElement {
  // Create <select> element
  const htmlSelectElement = document.createElement('select');
  htmlSelectElement.addEventListener('change', () => setModification(element, htmlSelectElement.value));

  // Create <option> elements
  for (const option of Object.keys(examples)) {
    const htmlOptionElement = document.createElement('option');
    htmlOptionElement.innerText = option;
    htmlOptionElement.value = examples[option];
    htmlSelectElement.append(htmlOptionElement);
  }

  // Create <label> element
  const htmlLabelElement = document.createElement('label');
  htmlLabelElement.className = 'dynamic-element-label';
  htmlLabelElement.append(element.source.name ?? element.source.type);
  htmlLabelElement.append(htmlSelectElement);

  return htmlLabelElement;
}

async function setModification(element: ElementState, value: string) {
  const selector = element.source.name ?? element.source.type;

  if (value) {
    // Set modification
    modifications[selector] = value;
  } else {
    // Clear modification
    delete modifications[selector];
  }

  await preview?.setModifications(modifications);
}

function getDemoTemplateSource() {
  return {
    output_format: 'mp4',
    width: 1280,
    height: 720,
    duration: '9.15 s',
    snapshot_time: '3.75 s',
    fill_color: 'rgba(255,255,255,1)',
    elements: [
      {
        id: 'b5f89f75-3028-431a-8ac9-f4b99da40390',
        type: 'composition',
        track: 1,
        time: '0 s',
        duration: '7.628 s',
        x: [
          {
            time: 'start',
            easing: 'linear',
            value: '90.83%',
          },
          {
            time: 'end',
            easing: 'linear',
            value: '24.41%',
          },
        ],
        width: '96.3609%',
        height: '88.4343%',
        elements: [
          {
            id: '6580f435-e542-4fe5-9354-48404a735d42',
            type: 'composition',
            track: 1,
            time: '0 s',
            x: [
              {
                time: '0 s',
                easing: 'exponential-out',
                value: '21.1987%',
              },
              {
                time: '1.4 s',
                easing: 'exponential-out',
                value: '20.2069%',
              },
            ],
            y: [
              {
                time: '0 s',
                easing: 'exponential-out',
                value: '160.4487%',
              },
              {
                time: '1.4 s',
                easing: 'exponential-out',
                value: '47.359%',
              },
            ],
            width: '54.8284 vmin',
            height: '63.9332 vmin',
            z_rotation: [
              {
                time: '0 s',
                easing: 'exponential-out',
                value: '30.12°',
              },
              {
                time: '1.4 s',
                easing: 'exponential-out',
                value: '14.67°',
              },
            ],
            fill_color: 'rgba(255,255,255,1)',
            shadow_color: 'rgba(0,0,0,0.22)',
            shadow_blur: '2.2 vmin',
            shadow_y: '0.9 vmin',
            elements: [
              {
                id: '8f854cb3-15a8-406d-80a0-3cbe4782c308',
                name: 'Image-1',
                type: 'image',
                track: 1,
                time: '0 s',
                dynamic: true,
                y: '44.8996%',
                width: '89.2057%',
                height: '80.4823%',
                source: '098f8689-1917-40f5-8db5-225a0ddc2522',
              },
              {
                id: '695ac5b4-d69e-49ba-ae46-514f746a31a2',
                name: 'Text-1',
                type: 'text',
                track: 2,
                time: '0 s',
                dynamic: true,
                y: '91.756%',
                width: '89.2057%',
                height: '13.2305%',
                x_alignment: '50%',
                y_alignment: '50%',
                fill_color: '#333333',
                text: 'Photo caption 1',
                font_family: 'Caveat',
                font_weight: '500',
                font_size_maximum: '4.5 vmin',
              },
            ],
          },
          {
            id: '4bb7015a-99f2-4e29-9844-0e2af0ec367e',
            type: 'composition',
            track: 2,
            time: '1.8 s',
            x: [
              {
                time: '0 s',
                easing: 'exponential-out',
                value: '54.9749%',
              },
              {
                time: '1.4 s',
                easing: 'exponential-out',
                value: '54.9749%',
              },
            ],
            y: [
              {
                time: '0 s',
                easing: 'exponential-out',
                value: '152.3798%',
              },
              {
                time: '1.4 s',
                easing: 'exponential-out',
                value: '61.5648%',
              },
            ],
            width: '54.8284 vmin',
            height: '63.9332 vmin',
            z_rotation: [
              {
                time: '0 s',
                easing: 'exponential-out',
                value: '-30.63°',
              },
              {
                time: '1.4 s',
                easing: 'exponential-out',
                value: '-4.433°',
              },
            ],
            fill_color: 'rgba(255,255,255,1)',
            shadow_color: 'rgba(0,0,0,0.22)',
            shadow_blur: '2.2 vmin',
            shadow_y: '0.9 vmin',
            elements: [
              {
                id: '047d8c7e-637e-424d-8c0e-5531c54b9b76',
                name: 'Image-2',
                type: 'image',
                track: 1,
                time: '0 s',
                dynamic: true,
                y: '44.8996%',
                width: '89.2057%',
                height: '80.4823%',
                source: '0b3cb194-e3ae-47c4-a3f8-dafddb59f835',
              },
              {
                id: '193354bf-4335-4b5b-bfed-355664c249db',
                name: 'Text-2',
                type: 'text',
                track: 2,
                time: '0 s',
                dynamic: true,
                y: '91.756%',
                width: '89.2057%',
                height: '13.2305%',
                x_alignment: '50%',
                y_alignment: '50%',
                fill_color: '#333333',
                text: 'Photo caption 2',
                font_family: 'Caveat',
                font_weight: '500',
                font_size_maximum: '4.5 vmin',
              },
            ],
          },
          {
            id: '6396bf07-49c7-47ca-af0c-0986ab2c4c59',
            type: 'composition',
            track: 3,
            time: '3.6 s',
            x: [
              {
                time: '0.02 s',
                easing: 'exponential-out',
                value: '87.5035%',
              },
              {
                time: '1.4 s',
                easing: 'exponential-out',
                value: '83.4531%',
              },
            ],
            y: [
              {
                time: '0.02 s',
                easing: 'exponential-out',
                value: '146.9043%',
              },
              {
                time: '1.4 s',
                easing: 'exponential-out',
                value: '37.0468%',
              },
            ],
            width: '54.8284 vmin',
            height: '63.9332 vmin',
            z_rotation: [
              {
                time: '0.02 s',
                easing: 'exponential-out',
                value: '-25.31°',
              },
              {
                time: '1.4 s',
                easing: 'exponential-out',
                value: '1.692°',
              },
            ],
            fill_color: 'rgba(255,255,255,1)',
            shadow_color: 'rgba(0,0,0,0.22)',
            shadow_blur: '2.2 vmin',
            shadow_y: '0.9 vmin',
            elements: [
              {
                id: 'dccf14c2-a570-4294-b88b-c18c6e976bfe',
                name: 'Image-3',
                type: 'image',
                track: 1,
                time: '0 s',
                dynamic: true,
                y: '44.8996%',
                width: '89.2057%',
                height: '80.4823%',
                source: 'b90d9c03-e4a0-4c33-8305-44dcef2257fb',
              },
              {
                id: '511e3ab3-5814-4b4a-9c3d-54dff708670f',
                name: 'Text-3',
                type: 'text',
                track: 2,
                time: '0 s',
                dynamic: true,
                y: '91.756%',
                width: '89.2057%',
                height: '13.2305%',
                x_alignment: '50%',
                y_alignment: '50%',
                fill_color: '#333333',
                text: 'Photo caption 3',
                font_family: 'Caveat',
                font_weight: '500',
                font_size_maximum: '4.5 vmin',
              },
            ],
          },
        ],
      },
      {
        id: '54dc7e81-a53c-4c49-9ac5-d81a3b04384e',
        type: 'composition',
        track: 1,
        time: '6.59 s',
        animations: [
          {
            time: 'start',
            duration: '1.038 s',
            easing: 'cubic-bezier(0.37, 0, 0.42, 0.99)',
            transition: true,
            type: 'slide',
            distance: '25%',
            direction: '180°',
          },
        ],
        elements: [
          {
            id: '8f5ebc6d-84bd-4004-bd44-23eab40e68eb',
            type: 'text',
            track: 1,
            time: '0.53 s',
            x: '60.916%',
            y: '60.2187%',
            width: '42.3936%',
            height: '13.3395%',
            fill_color: 'rgba(0,0,0,1)',
            animations: [
              {
                time: 'start',
                duration: '1 s',
                easing: 'quadratic-out',
                type: 'text-slide',
                scope: 'split-clip',
                split: 'line',
                direction: 'down',
              },
            ],
            text: 'www.mywebsite.com',
            font_family: 'Chivo',
          },
          {
            id: '16e6d128-1bac-42cc-b0a7-eb744a5006f2',
            type: 'text',
            track: 2,
            time: '0 s',
            x: '60.916%',
            y: '43.3303%',
            width: '42.3934%',
            height: '20.4372%',
            y_alignment: '100%',
            fill_color: 'rgba(52,14,14,1)',
            text: 'Logoipsum',
            font_family: 'Chivo',
            font_weight: '700',
          },
          {
            id: '4ff964a3-ac3e-4bb6-8646-617bb255ab74',
            type: 'shape',
            track: 3,
            x: '27.3869%',
            width: '18.9994%',
            height: '33.7768%',
            aspect_ratio: 1,
            x_anchor: '50%',
            y_anchor: '50%',
            fill_color: '#f15757',
            path: 'M 50 100 C 77.6142 100 100 77.6148 100 50 C 100 22.3852 77.6142 0 50 0 C 22.3858 0 0 22.3852 0 50 C 0 77.6148 22.3858 100 50 100 Z M 65.5983 23.2923 L 58.08 50 L 71.4049 50 C 74.201 50 74.609 53.6798 72.0168 55.5258 L 38.6503 79.2968 C 36.26 81.0004 33.6422 79.4055 34.4017 76.7087 L 40.5527 54.8555 L 54.5059 49.9323 L 37.3824 49.9323 L 28.5951 50 C 25.799 50 25.391 46.3202 27.9832 44.4742 L 61.3497 20.7032 C 63.74 18.9996 66.3578 20.5945 65.5983 23.2923 Z',
          },
        ],
      },
    ],
  };
}
